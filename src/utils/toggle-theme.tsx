
export default function toggleDataTheme(themeOption: string) {
    const body = document.querySelector(".Body") as HTMLElement;
    body.dataset.theme = themeOption;
}

