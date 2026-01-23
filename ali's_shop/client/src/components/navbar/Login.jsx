import React from 'react'
import { Link } from "react-router-dom"
import { User } from 'lucide-react';


function Login() {
    return (
        <Link to="/login" className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-800 transition-colors">
            <User size={20} />
            <span>Giriş</span>
        </Link>
    );
}

export default Login