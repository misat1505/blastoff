import LoadingScreen from "@/components/loading-screen";
import NotFoundScreen from "@/components/not-found-screen";
import TopBar from "@/components/top-bar";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { ROCKETS_QUERY_OPTIONS } from "../api/rockets-query-options";
import RocketCapacity from "../components/rocket-capacity";
import RocketDimensions from "../components/rocket-dimensions";
import RocketHero from "../components/rocket-hero";
import RocketLaunches from "../components/rocket-launches";
import RocketManufacturer from "../components/rocket-manufacturer";
import RocketRecoveries from "../components/rocket-recoveries";
import { getIsRocketRecovariable } from "../utils/get-is-rocket-recovariable";
import { getRecoveryVariant } from "../utils/get-recovery-variant";

const RocketDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: rocket, isPending } = useQuery(
    ROCKETS_QUERY_OPTIONS.byId(Number(id)),
  );

  if (isPending) return <LoadingScreen />;
  if (!rocket) return <NotFoundScreen text="This rocket doesn't exist." />;

  const isRecovariable = getIsRocketRecovariable(rocket);

  return (
    <View>
      <TopBar text={rocket.name} />
      <ScrollView>
        <RocketHero {...rocket} />
        <RocketDimensions {...rocket} />
        <RocketManufacturer agency={rocket.agency} />
        <RocketCapacity {...rocket} />
        <RocketLaunches {...rocket} />
        {isRecovariable ? (
          <RocketRecoveries
            {...rocket}
            recoveryVariant={getRecoveryVariant(rocket)}
          />
        ) : null}
        <View style={{ height: 90 }}></View>
      </ScrollView>
    </View>
  );
};

export default RocketDetailsScreen;
