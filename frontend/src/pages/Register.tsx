
export type RegisterFormData = {

    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  import { useForm } from 'react-hook-form';
import * as apiClient from "../api-client"
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const queryClient = useQueryClient();
    const navigate=useNavigate();
    const {showToast}=useAppContext();
     const {
        register,watch,handleSubmit,
        formState:{errors},
    } =useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
          showToast({ message: "Registration Success!", type: "SUCCESS" });
          await queryClient.invalidateQueries("validateToken");
          navigate("/");
        },
        onError: (error: Error) => {
          showToast({ message: error.message, type: "ERROR" });
        },
      });
    
     const onSubmit=handleSubmit((data)=>{
     mutation.mutate(data);
     });
     
    return (
      <form onSubmit={onSubmit} className="flex flex-row h-screen w-4/5 m-auto gap-5 ">
        <div className="w-1/2 h-4/5 ">
          <img src="./public/image/hotelImage.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-1/2 ">
          <h2 className="text-3xl font-bold">Create An Account</h2>
          <div className="flex flex-col md:flex-row gap-5">
            <label className="text-gray-700 text-sm font-bold flex-1" htmlFor="">
                First Name
                <input className="border rounded w-full py-1 px-2 font-normal"
                 {...register("firstName",{required:"This is required Fields"})} type="text" />
                    {errors.firstName&&(
                    <span className='text-red-500'>{errors.firstName.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1" htmlFor="">
                Last Name
                <input className="border rounded w-full py-1  px-2 font-normal" 
                 {...register("lastName",{required:"This is required Fields"})}
                type="text" />
                {errors.lastName&&(
                    <span className='text-red-500'>{errors.lastName.message}</span>
                )}
            </label>
          </div>
          <label className="text-gray-700 text-sm font-bold flex-1" htmlFor="">
                Email
                <input className="border rounded w-full py-1  px-2 font-normal" 
                 {...register("email",{required:"This is required Fields"})}
                type="email" />
                 {errors.email&&(
                    <span className='text-red-500'>{errors.email.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1" htmlFor="">
                Password
                <input className="border rounded w-full py-1  px-2 font-normal" 
                 {...register("password",{required:"This is required Fields",
                 minLength:{
                    value:6,
                    message:"Password mus be 6 or more than that!"
                 }
                })}
                type="password" />
                 {errors.password&&(
                    <span className='text-red-500'>{errors.password.message}</span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1" htmlFor="">
               Confirm  Password
                <input className="border rounded w-full py-1  px-2 font-normal" 
                 {...register("confirmPassword",{
                    validate:(val)=>{
                        if(!val){
                            return "This  Fiels is required"
                        }else if (watch("password")!==val){ 
                        return "Your password is not same"
                        }
                    }
                })}
                type="password" />
                 {errors.confirmPassword&&(
                    <span className='text-red-500'>{errors.confirmPassword.message}</span>
                )}
            </label>
            <div className='my-6'>
            <span >
                <button 
                type='submit'
                 className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'>
                  Create Account
                </button>
            </span>
            </div>
            
        </div>
        
      </form>
    );
  };
  
  export default Register;
  

