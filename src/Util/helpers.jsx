import moment from "moment";
import { toast } from "react-toastify";

export const createDateAsUTC = (date) => {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
};

export const formatCurrency = (number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(number);
};

export const format_number = (x) =>
  x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const format_date = (date) => moment(date).format("LL");

export const format_time = (date) => moment(date).format("hh:mm a");

export const closeModals = () => {
  window?.$(".modal").modal("hide");
  window?.$(".modal-backdrop").remove();
};

export const guidGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

export const notification = (message,type = 'success')=> {
  toast[type](message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    });
}
export const emptyElementExists = (arr) => arr.includes("");



export const setAccessToken = (token)=>{
  localStorage.setItem('u_token',token);
} 

export const getAccessToken = ()=> localStorage.getItem('u_token')
export const removeAccessToken = ()=> localStorage.removeItem('u_token')