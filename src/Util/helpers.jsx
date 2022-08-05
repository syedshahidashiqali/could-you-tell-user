
import moment from "moment";
import { toast } from "react-toastify";
import { updateSuccessPopup } from "../store/actions";
import { image_url } from "./connection_strings";
// const dispatch = useDispatch();
// const useStore = redux.();
// const store = ()=> useStore(); 
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

export const format_date = (date,format = "LL") => moment(date).format(format);

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


export const range = (_start_, _end_)=> {
return (new Array(_end_ - _start_ + 1)).fill(undefined).map((_, k) =>k + _start_);
}



export const buildFormData = (formData, data, parentKey) =>  {

  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
          buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
  } else {
      const value = data == null ? '' : data;

      formData.append(parentKey, value);
  }
}


export const serialNumber = (data, index = 0)=> {
  let starting = data.perPage * (data.currentPage - 1);
  index++;
  return starting + index;
}


export const getRatingPercentage = (total,count)=> {
    return ((count / total) * 100).toFixed();
};


export const asset = (filePath)=> {
    return `${image_url}${filePath}`;
};


export const getImage = (images,index = 0)=> {
  return images[index] || null;
}