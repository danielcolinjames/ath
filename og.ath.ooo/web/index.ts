import { ParsedRequest } from "../api/_lib/types";
const { H, R, copee } = window as any;
let timeout = -1;

interface ImagePreviewProps {
  src: string;
  onclick: () => void;
  onload: () => void;
  onerror: () => void;
  loading: boolean;
}

const ImagePreview = ({
  src,
  onclick,
  onload,
  onerror,
  loading,
}: ImagePreviewProps) => {
  const style = {
    filter: loading ? "blur(5px)" : "",
    opacity: loading ? 0.1 : 1,
  };
  const title = "Click to copy image URL to clipboard";
  return H(
    "a",
    { className: "image-wrapper", href: src, onclick },
    H("img", { src, onload, onerror, style, title })
  );
};

interface DropdownOption {
  ticker: string;
  name: string;
  image: string;
  r: number;
  g: number;
  b: number;
}

interface DropdownProps {
  options: DropdownOption[];
  ticker: string;
  name: string;
  image: string;
  r: number;
  g: number;
  b: number;
  onchange: (val: string) => void;
  small: boolean;
}

const Dropdown = ({
  options,
  ticker,
  name,
  image,
  r,
  g,
  b,
  onchange,
  small,
}: DropdownProps) => {
  const wrapper = small ? "select-wrapper small" : "select-wrapper";
  const arrow = small ? "select-arrow small" : "select-arrow";
  return H(
    "div",
    { className: wrapper },
    H(
      "select",
      { onchange: (e: any) => onchange(e.target.value) },
      options.map((o) =>
        H(
          "option",
          {
            value: o.ticker,
            selected: ticker === o.ticker,
            name,
            image,
            r,
            g,
            b,
          },
          o.ticker
        )
      )
    ),
    H("div", { className: arrow }, "▼")
  );
};
interface FieldProps {
  label: string;
  input: any;
}

const Field = ({ label, input }: FieldProps) => {
  return H(
    "div",
    { className: "field" },
    H(
      "label",
      H("div", { className: "field-label" }, label),
      H("div", { className: "field-value" }, input)
    )
  );
};

interface ToastProps {
  show: boolean;
  message: string;
}

const Toast = ({ show, message }: ToastProps) => {
  const style = { transform: show ? "translate3d(0,-0px,-0px) scale(1)" : "" };
  return H(
    "div",
    { className: "toast-area" },
    H(
      "div",
      { className: "toast-outer", style },
      H(
        "div",
        { className: "toast-inner" },
        H("div", { className: "toast-message" }, message)
      )
    )
  );
};

const assetTestExamples: DropdownOption[] = [
  {
    ticker: "BAT",
    name: "Basic Attention Token",
    r: 252,
    g: 84,
    b: 4,
    image:
      "https://assets.coingecko.com/coins/images/677/large/basic-attention-token.png?1547034427",
  },
  {
    ticker: "HNT",
    name: "Helium",
    r: 68,
    g: 76,
    b: 252,
    image:
      "https://assets.coingecko.com/coins/images/4284/large/Helium_HNT.png?1612620071",
  },
  {
    ticker: "BTC",
    name: "Bitcoin",
    r: 244,
    g: 148,
    b: 28,
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  },
];

interface AppState extends ParsedRequest {
  loading: boolean;
  showToast: boolean;
  messageToast: string;
  selectedImageIndex: number;
  widths: string[];
  heights: string[];
  overrideUrl: URL | null;
}

type SetState = (state: Partial<AppState>) => void;

const App = (_: any, state: AppState, setState: SetState) => {
  const setLoadingState = (newState: Partial<AppState>) => {
    window.clearTimeout(timeout);
    if (state.overrideUrl && state.overrideUrl !== newState.overrideUrl) {
      newState.overrideUrl = state.overrideUrl;
    }
    if (newState.overrideUrl) {
      timeout = window.setTimeout(() => setState({ overrideUrl: null }), 200);
    }

    setState({ ...newState, loading: true });
  };
  const {
    fileType = "png",
    assetName = "Basic Attention Token",
    assetSymbol = "BAT",
    r = "252",
    g = "84",
    b = "4",
    image = "https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg",
    showToast = false,
    messageToast = "",
    loading = true,
    overrideUrl = null,
  } = state;
  const url = new URL(window.location.origin);
  url.pathname = `${assetSymbol}.${fileType}`;
  url.searchParams.append("assetName", assetName);
  url.searchParams.append("assetSymbol", assetSymbol);
  url.searchParams.append("r", r);
  url.searchParams.append("g", g);
  url.searchParams.append("b", b);
  url.searchParams.append("image", image);

  return H(
    "div",
    { className: "split" },
    H(
      "div",
      { className: "pull-left" },
      H(
        "div",
        H(Field, {
          label: "Ticker Symbol",
          input: H(Dropdown, {
            options: assetTestExamples,
            ticker: assetSymbol,
            name: assetName,
            image: image,
            onchange: (ticker: string) =>
              setLoadingState({
                assetSymbol: ticker,
                assetName: assetName,
                image: image,
              }),
          }),
        })
      )
    ),
    H(
      "div",
      { className: "pull-right" },
      H(ImagePreview, {
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
        onclick: (e: Event) => {
          e.preventDefault();
          const success = copee.toClipboard(url.href);
          if (success) {
            setState({
              showToast: true,
              messageToast: "Copied image URL to clipboard",
            });
            setTimeout(() => setState({ showToast: false }), 3000);
          } else {
            window.open(url.href, "_blank");
          }
          return false;
        },
      })
    ),
    H(Toast, {
      message: messageToast,
      show: showToast,
    })
  );
};

R(H(App), document.getElementById("app"));
