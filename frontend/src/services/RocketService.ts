import { Rocket } from "../types/Rocket";

export class RocketService {
  static async getRocketById(id: Rocket["id"]): Promise<Rocket | null> {
    const rocket: Rocket = {
      id: 464,
      name: "Starship",
      description: "Fully reusable two-stage super heavy-lift launch vehicle.",
      image_url:
        "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/starship_liftof_image_20240314160301.jpg",
      agency: {
        id: 121,
        name: "SpaceX",
        image_url:
          "https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/spacex_logo_20220826094919.png",
      },
      dimensions: {
        diameter: 9,
        length: 120,
        stages: 2,
        mass: 5000,
        thrust: 72000,
      },
      capacity: {
        leo_capacity: 100000,
        gto_capacity: 21000,
        geo_capacity: null,
        sso_capacity: null,
      },
      launches: {
        cost: null,
        launches_count: 6,
        successful_launches: 4,
        failed_launches: 2,
        pending_launches: 2,
      },
      landings: {
        attempted_landings: 5,
        successful_landings: 2,
        failed_landings: 3,
      },
    };

    return await new Promise((res) => {
      setTimeout(() => {
        res(rocket.id === id ? rocket : null);
      }, 1000);
    });
  }
}
