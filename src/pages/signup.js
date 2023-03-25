
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');

    return (
        <div className="w-1/3 max-w-6xl pt-32 m-auto">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
        <div className="w-full mt-1">
            <input
                type="email"
                name="email"
                id="email"
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="email@beispiel.de "
            ></input>

        <label htmlFor="password" className="block mt-4 text-sm font-medium text-gray-700">Passwort</label>   
        <input
                type="email"
                name="email"
                id="email"
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="passwort"
            ></input> 
            
            <button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mt-4">Purple</button>
        </div>
    </div>
    )
 
}