import "./navbar.css";

function Navbar({ language, onLanguageChange, theme, onToggleTheme }) {
    const isLightMode = theme === "light";
    const languages = [
        { label: "English", value: "english" },
        { label: "Hindi", value: "hindi" },
        { label: "Hinglish", value: "hinglish" },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="navbar-logo">
                    <span className="logo-mark" aria-hidden="true">GS</span>
                    <span className="logo-text">GovtSathi</span>
                </a>

                <div className="navbar-controls">
                    <div className="language-switch" role="group" aria-label="Select language">
                        {languages.map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                className={`lang-btn ${language === item.value ? "active" : ""}`}
                                onClick={() => onLanguageChange(item.value)}
                                aria-pressed={language === item.value}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        className={`mode-switch ${isLightMode ? "is-light" : "is-dark"}`}
                        onClick={onToggleTheme}
                        aria-label={`Switch to ${isLightMode ? "dark" : "light"} mode`}
                        aria-pressed={!isLightMode}
                    >
                        <span className="mode-track">
                            <span className="mode-thumb" />
                        </span>
                        <span className="mode-label">{isLightMode ? "Light" : "Dark"}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
