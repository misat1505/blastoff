export type Rocket = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  agency: {
    id: number;
    name: string;
    image_url: string;
  };
  dimensions: {
    diameter: number | null;
    length: number | null;
    stages: number | null;
    mass: number | null;
    thrust: number | null;
  };
  capacity: {
    leo_capacity: number | null;
    gto_capacity: number | null;
    geo_capacity: number | null;
    sso_capacity: number | null;
  };
  launches: {
    cost: number | null;
    launches_count: number;
    successful_launches: number;
    failed_launches: number;
    pending_launches: number;
  };
  landings: {
    attempted_landings: number | null;
    successful_landings: number | null;
    failed_landings: number | null;
  };
};
