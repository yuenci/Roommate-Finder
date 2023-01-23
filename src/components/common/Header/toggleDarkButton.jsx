import { useState} from "react";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import "./header.css";


export default function ToggleDarkButton() {
    // false = light
    // true = dark


    let theme = localStorage.getItem("theme");
    if (!theme) {
        theme = "light";
        localStorage.setItem("theme", theme);
    }
    theme = theme === "dark";

    const [isDarkMode, setDarkMode] = useState(theme);

    if (theme){
        switchToDark();
    }else{
        switchToLight();
    }

    function toggleDarkMode(checked){
        console.log(checked)
        setDarkMode(checked);
        if (checked){
            switchToDark();
            localStorage.setItem("theme", "dark");
        }else{
            switchToLight();
            localStorage.setItem("theme", "light");
        }
    }

    function switchToDark() {
        document.body.classList.add("body-dark");
        document.body.setAttribute('arco-theme', 'dark');
        document.querySelectorAll('html')[0].setAttribute('darkreader-scheme', 'one')
    }

    function switchToLight() {
        document.body.classList.remove("body-dark");
        document.body.classList.add("body-light");
        document.body.removeAttribute('arco-theme');
        document.querySelectorAll('html')[0].setAttribute('darkreader-scheme', 'none')
    }



    return (
        <div className={"toggle-dark-btn-con"}>
            <DarkModeSwitch
                style={{ marginBottom: '2rem' }}
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size={40}
            />
        </div>

    );
}