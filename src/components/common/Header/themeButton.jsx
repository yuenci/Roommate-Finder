import {useState} from "react";
import { ReactComponent as SunIcon } from "./sun.svg";
import { ReactComponent as MoonIcon } from "./moon.svg";

export default function ThemeButton() {
    let theme = localStorage.getItem("theme");
    if (!theme) {
        theme = "light";
        localStorage.setItem("theme", theme);
    }

    const [themeState, setThemeState] = useState(theme);

    function changeTheme() {
        if (themeState === "light") {
            setThemeState("dark");
            localStorage.setItem("theme", "dark");
            document.body.setAttribute('arco-theme', 'dark');

        } else {
            setThemeState("light");
            localStorage.setItem("theme", "light");
            document.body.removeAttribute('arco-theme');

        }
    }


    return (
        <div className="themeButton" onClick={changeTheme}>
            {
                themeState === "light"
                    ? <div className="themeButton__moon">
                        <MoonIcon  className="themeButton__moon__icon" />
                    </div>
                    : <div className="themeButton__sun">
                        <SunIcon  className="themeButton__sun__icon" />
                    </div>
            }
        </div>
    )
}