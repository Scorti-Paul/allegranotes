import Cookies from "js-cookie";
export const Auth = new (class {
  getToken = () => {
    return Cookies.get("accessToken");
  };

  setToken = (name: string, value: any) => {
    return Cookies.set(name, JSON.stringify(value), { expires: 1 });
  };
})();