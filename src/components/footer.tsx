
export default function Footer() {

const getYear = (startYear:number) =>{
const currentYear = new Date().getFullYear()

return currentYear == startYear ? `${currentYear}` : 
currentYear > startYear ? `${startYear} - ${currentYear}` :
`${currentYear} - ${startYear}` 
}

return (
    <footer
     style={{backgroundColor:'black',color:'white',textAlign:'center',padding:'10px'}} 
     >
        <p>Copyright &copy;<span id="footerdate">{getYear(2026)}</span> . All rights reserved. ####.com.ng <br/> Designed by Emeka Onwuepe.</p>
      
    </footer>
  )
}
