window.globa = {
    /**
     * 存储localStorage
     */
    setStore: (name, data) => {
        if (!name || !data) return;
        if (typeof content !== 'string') {
            data = JSON.stringify(data);
        }
        window.localStorage.setItem(name, data);
    },
    /**
     * 获取localStorage
     */
    getStore: (name) => {
        if (!name) return;
        return JSON.parse(window.localStorage.getItem(name))
    },

    /**
     * 移除localStorage中的某一项
     * */ 
    removeStore: (name) =>{
        if(!name) return
        window.localStorage.removeItem(name)
    },
    /**
     * 清除localStorage
     */
    clearStore: () => {
        window.localStorage.clear();
    },

    /**
     * 监听滚动到底
     * */
    onReachBottom: (event) => {
        const scrollHight = event.target.scrollHeight; //滚动距离总长
        const scrollTop = event.target.scrollTop;   //滚动到的当前位置
        const boxHight = event.target.clientHeight;
        if (scrollTop + boxHight >= scrollHight) return true
        else return false
    },
}

