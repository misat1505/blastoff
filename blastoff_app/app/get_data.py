import asyncio
import datetime
import logging

from app.api_connection.api_connector import APIDataConnector
from app.api_connection.get_api_data import APIError
from app.crud import *
from app.schemas import *

API_BASE = f"https://ll.thespacedevs.com/2.3.0/launches/?limit=50&ordering=net&net__gte={datetime.datetime.now().isoformat()}&format=json&mode=list"


async def get_api_data(db):
    current_launches = await get_current_launches(db)
    connector = APIDataConnector(API_BASE, current_launches, max_loop_count=20)
    try:
        data = await asyncio.to_thread(connector.get_difference)
        for flight_data in data:
            flight_data.rocket["agency_id"] = flight_data.agency.get("id")
            flight_data.launch["site_id"] = (
                flight_data.site.get("id")
                if flight_data.site is not None
                else None
            )
            flight_data.launch["program_id"] = (
                flight_data.program.get("id")
                if flight_data.program is not None
                else None
            )
            flight_data.launch["rocket_id"] = flight_data.rocket.get("id")

            if flight_data.site is not None:
                site_data = SiteCreate(**flight_data.site)
                if (
                    await update_site(
                        db=db,
                        site_id=flight_data.site.get("id"),
                        site_data=site_data,
                    )
                    is None
                ):
                    await create_site(db=db, site_data=site_data)
                    logging.info(f"Added site - {flight_data.site.get('id')}")

            if flight_data.program is not None:
                program_data = ProgramCreate(**flight_data.program)
                if (
                    await update_program(
                        db=db,
                        program_id=flight_data.program.get("id"),
                        program_data=program_data,
                    )
                    is None
                ):
                    await create_program(db=db, program_data=program_data)
                    logging.info(
                        f"Added program - {flight_data.program.get('id')}"
                    )

            agency_data = AgencyCreate(**flight_data.agency)
            if (
                await update_agency(
                    db=db,
                    agency_id=flight_data.agency.get("id"),
                    agency_data=agency_data,
                )
                is None
            ):
                await create_agency(db=db, agency_data=agency_data)
                logging.info(f"Added agency - {flight_data.agency.get('id')}")

            rocket_data = RocketCreate(**flight_data.rocket)
            if (
                await update_rocket(
                    db=db,
                    rocket_id=flight_data.rocket.get("id"),
                    rocket_data=rocket_data,
                )
                is None
            ):
                await create_rocket(db=db, rocket_data=rocket_data)
                logging.info(f"Added rocket - {flight_data.rocket.get('id')}")

            launch_data = LaunchCreate(**flight_data.launch)
            if (
                await update_launch(
                    db=db,
                    launch_id=flight_data.launch.get("id"),
                    launch_data=launch_data,
                )
                is None
            ):
                await create_launch(db=db, launch_data=launch_data)
                logging.info(f"Added launch - {flight_data.launch.get('id')}")

    except APIError as e:
        logging.warning(f"Api error occurred: {e}")
