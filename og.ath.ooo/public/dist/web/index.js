const { H, R, copee } = window;
let timeout = -1;
const ImagePreview = ({ src, onclick, onload, onerror, loading, }) => {
    const style = {
        filter: loading ? "blur(5px)" : "",
        opacity: loading ? 0.1 : 1,
    };
    const title = "Click to copy image URL to clipboard";
    return H("a", { className: "image-wrapper", href: src, onclick }, H("img", { src, onload, onerror, style, title }));
};
const Dropdown = ({ options, value, onchange, small }) => {
    const wrapper = small ? "select-wrapper small" : "select-wrapper";
    const arrow = small ? "select-arrow small" : "select-arrow";
    return H("div", { className: wrapper }, H("select", { onchange: (e) => onchange(e.target.value) }, options.map((o) => H("option", { value: o.value, selected: value === o.value }, o.text))), H("div", { className: arrow }, "▼"));
};
const Field = ({ label, input }) => {
    return H("div", { className: "field" }, H("label", H("div", { className: "field-label" }, label), H("div", { className: "field-value" }, input)));
};
const Toast = ({ show, message }) => {
    const style = { transform: show ? "translate3d(0,-0px,-0px) scale(1)" : "" };
    return H("div", { className: "toast-area" }, H("div", { className: "toast-outer", style }, H("div", { className: "toast-inner" }, H("div", { className: "toast-message" }, message))));
};
const fileTypeOptions = [
    { text: "PNG", value: "png" },
    { text: "JPEG", value: "jpeg" },
];
const fontSizeOptions = Array.from({ length: 10 })
    .map((_, i) => i * 25)
    .filter((n) => n > 0)
    .map((n) => ({ text: n + "px", value: n + "px" }));
const markdownOptions = [
    { text: "Plain Text", value: "0" },
    { text: "Markdown", value: "1" },
];
const App = (_, state, setState) => {
    const setLoadingState = (newState) => {
        window.clearTimeout(timeout);
        if (state.overrideUrl && state.overrideUrl !== newState.overrideUrl) {
            newState.overrideUrl = state.overrideUrl;
        }
        if (newState.overrideUrl) {
            timeout = window.setTimeout(() => setState({ overrideUrl: null }), 200);
        }
        setState({ ...newState, loading: true });
    };
    const { fileType = "png", text = "**Hello** World", assetName = "Basic Attention Token", assetSymbol = "BAT", r = "252", g = "84", b = "4", image = "https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg", showToast = false, messageToast = "", loading = true, overrideUrl = null, } = state;
    const url = new URL(window.location.origin);
    url.pathname = `${encodeURIComponent(text)}.${fileType}`;
    url.searchParams.append("assetName", assetName);
    url.searchParams.append("assetSymbol", assetSymbol);
    url.searchParams.append("r", r);
    url.searchParams.append("g", g);
    url.searchParams.append("b", b);
    url.searchParams.append("image", image);
    return H("div", { className: "split" }, H("div", { className: "pull-left" }, H("div", H(Field, {
        label: "File Type",
        input: H(Dropdown, {
            options: fileTypeOptions,
            value: fileType,
            onchange: (val) => setLoadingState({ fileType: val }),
        }),
    }), H(Field, {
        label: "Asset Name",
        input: H(Dropdown, {
            options: fontSizeOptions,
            value: assetName,
            onchange: (val) => setLoadingState({ assetName: val }),
        }),
    }), H(Field, {
        label: "Text Type",
        input: H(Dropdown, {
            options: markdownOptions,
            value: assetSymbol,
            onchange: (val) => setLoadingState({ assetSymbol: val }),
        }),
    }))), H("div", { className: "pull-right" }, H(ImagePreview, {
        src: overrideUrl ? overrideUrl.href : url.href,
        loading: loading,
        onload: () => setState({ loading: false }),
        onerror: () => {
            setState({
                showToast: true,
                messageToast: "Oops, an error occurred",
            });
            setTimeout(() => setState({ showToast: false }), 2000);
        },
        onclick: (e) => {
            e.preventDefault();
            const success = copee.toClipboard(url.href);
            if (success) {
                setState({
                    showToast: true,
                    messageToast: "Copied image URL to clipboard",
                });
                setTimeout(() => setState({ showToast: false }), 3000);
            }
            else {
                window.open(url.href, "_blank");
            }
            return false;
        },
    })), H(Toast, {
        message: messageToast,
        show: showToast,
    }));
};
R(H(App), document.getElementById("app"));
//# sourceMappingURL=index.js.map