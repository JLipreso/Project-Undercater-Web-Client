export function variable() {
    if(window.location.hostname == 'localhost') {
        return {
            api_main: "http://127.0.0.1:8000/api/"
        }
    }
    else {
        return {
            api_main: "https://api.undercater.com/ver-1/public/api/"
        }
    }
}
      