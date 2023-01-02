export function VersionInfoFooter() {
    const css = {
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        height: "30px",
        lineHeight: "30px",
        textAlign: "center",
        backgroundColor: "#74c0fc",
    }


    return (
        <div style={css}>
            <div>Technical preview version 3</div>
        </div>
    );

}