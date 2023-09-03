const fileExtMap = [
    {
        exts: [".js", '.jsx'],
        name: "javascript",
    },
    {
        exts: [".ts", '.tsx'],
        name: "typescript",
    },
    {
        exts: [".html", ".htm"],
        name: "html",
    },
    {
        exts: [".json"],
        name: "json",
    },
    {
        exts: [".go"],
        name: "go",
    },
    {
        exts: [".xml"],
        name: "xml",
    },
    {
        exts: [".scss", ".sass"],
        name: "scss",
    },
    {
        exts: [".css"],
        name: "css",
    },
]
export const getLanguageByExt = (ext) => {
    if (ext === "" || !ext) return "bash";
    const getFileExtText = fileExtMap.filter(item => item.exts.includes(String(ext).toLowerCase()))
    if (getFileExtText.length === 0) return "bash";
    return getFileExtText[0].name
}