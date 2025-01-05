import { useCountdownFormat } from "@/hooks/useCountdownFormat";
import { SwitchCard } from "../Navbar";
import ThemeSwitch from "../ThemeSwitch";
import Tooltip from "../Tooltip";
import { Switch } from "../ui/switch";
import { useTooltipSwitch } from "@/hooks/useTooltipSwitch";

const ProfileSettings = () => {
  const [isSimplified, setIsSimplified] = useCountdownFormat();
  const [areVisible, setAreVisible] = useTooltipSwitch();

  return (
    <div className="bg-slate-300/40 dark:bg-slate-700/20 p-2 rounded-md mt-4">
      <SwitchCard
        title="Prefers Simplified Launch Countdown Format"
        description="Choose how the rocket launch countdown is displayed. If turned
                  on launch countdown will not include days."
      >
        <Switch
          checked={isSimplified}
          onClick={() => setIsSimplified((prev) => !prev)}
        />
      </SwitchCard>
      <SwitchCard
        title="Tooltips Preference"
        description="Choose whether tooltips are displayed."
      >
        <Tooltip content={areVisible ? "Disable tooltips" : "Enable tooltips"}>
          <span>
            <Switch
              checked={areVisible}
              onClick={() => setAreVisible((prev) => !prev)}
            />
          </span>
        </Tooltip>
      </SwitchCard>
      <SwitchCard
        title="Theme Preference"
        description="Choose theme for the app."
        className="mb-0"
      >
        <ThemeSwitch />
      </SwitchCard>
    </div>
  );
};

export default ProfileSettings;
