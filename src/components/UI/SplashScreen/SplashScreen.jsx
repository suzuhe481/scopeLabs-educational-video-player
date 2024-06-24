import { metronome } from "ldrs";

import styles from "./SplashScreen.module.scss";

const SplashScreen = () => {
  metronome.register();

  const splashAnimation = (
    <l-metronome size={100} speed={1.6} color={"black"}></l-metronome>
  );

  return (
    <div className={`${styles["splash-container"]}`}>
      <div className={`${styles["animation-container"]}`}>
        {splashAnimation}
      </div>
      <div className={`${styles["text-container"]}`}>Learnwell</div>
    </div>
  );
};

export default SplashScreen;
