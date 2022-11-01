const toc = require("markdown-toc")

const handleTOC = (blogInfo) => {
    const md = toc(blogInfo.markdownContent).json;

    const transfer = (md) => {
        const result = [];
        const stack = [];

        let max = 2;
        
        const createTOCItem = (item) => {
            return {
                name: item.content,
                anchor: item.slug,
                level: item.lvl,
                children: []
            }
        }
        
        const handleLowLevel = (tocItem) => {
            const top = stack[stack.length - 1];
            if (!top) {
                stack.push(tocItem);
            } else if(tocItem.level > top.level) {
                top.children.push(tocItem);
            } else {
                stack.pop();
                handleLowLevel(tocItem)
            }
        }
    
        for (const item of md) {
            const tocItem = createTOCItem(item);
            if (tocItem.level === max) {
                result.push(tocItem);
            }
            handleLowLevel(tocItem);
        }

        return result;
    }

    blogInfo.toc = transfer(md);
    delete blogInfo.markdownContent
    
    for (const item of md) {
        switch(item.lvl) {
            case 1: {
                const newStr = `<h1 id="${item.slug}">`;
                blogInfo.htmlContent.replace('<h1>', newStr);
                break;
            }
            case 2: {
                const newStr = `<h2 id="${item.slug}">`;
                blogInfo.htmlContent.replace('<h2>', newStr);
                break;
            }
            case 3: {
                const newStr = `<h3 id="${item.slug}">`;
                blogInfo.htmlContent.replace('<h3>', newStr);
                break;
            }
            case 4: {
                const newStr = `<h4 id="${item.slug}">`;
                blogInfo.htmlContent.replace('<h4>', newStr);
                break;
            }
            case 5: {
                const newStr = `<h5 id="${item.slug}">`;
                blogInfo.htmlContent.replace('<h5>', newStr);
                break;
            }
            case 6: {
                const newStr = `<h6 id="${item.slug}">`;
                blogInfo.htmlContent.replace('<h6>', newStr);
                break;
            }
        }
    }

    return blogInfo;
}


module.exports = handleTOC;
