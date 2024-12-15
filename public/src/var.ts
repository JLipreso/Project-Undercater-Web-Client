export function variable() {
    if(window.location.hostname == 'localhost') {
        return {
            api_main: "https://api.undercater.com/ver-1/public/api/"
        }
    }
    else {
        return {
            api_main: "https://api.undercater.com/ver-1/public/api/"
        }
    }
}
      