import { NavLink } from "react-router";

export default function Header() {

  return (
    <header>
        <div className="logo_div">

        </div>
        <nav>

        <NavLink className={({isActive,isPending,isTransitioning})=>
        isPending?"pending":isActive ?"active":isTransitioning?'transitioning':""} 
        id='nav' to={'/'}>Home</NavLink>

        <NavLink className={({isActive,isPending,isTransitioning})=>
        isPending?"pending":isActive ?"active":isTransitioning?'transitioning':""} 
        id='nav' to={'/customers'}>Customers</NavLink>

        <NavLink className={({isActive,isPending,isTransitioning})=>
        isPending?"pending":isActive ?"active":isTransitioning?'transitioning':""} 
        id='nav' to={'/analytics'}>Analytics</NavLink>


        </nav>
        <button>Logout</button>

    </header>
  )


}
