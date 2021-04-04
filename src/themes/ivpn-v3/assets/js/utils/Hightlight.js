
export function generateHtml(code) {
    let lines = code.split("\n")
    let html = []
    lines.forEach(l => {
        l = l.replace("<", "&lt;")
        l = l.replace(">", "&gt;")
        if (l.startsWith('#')) {
            html.push("<span class='line_comment'>" + l + "</span>")
        } else {
            html.push(l)
        }
    });

    return html.join("<br>\n")
}


