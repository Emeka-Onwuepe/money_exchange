import { useAppSelector } from "../integrations/hooks";

const style = {
    container:{
        display:'flex',
        flexDirection:'row' as 'row',
        alignItems:'center',
        justifyContent:'center',
        padding:'10px',
        borderRadius:'5px',
        // backgroundColor:'#ffffff',
    },
    bounce_1: {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'green',
        margin: '10px',
        animation: 'bounce 1.5s infinite ease-in-out',
        animationDelay: '0s',
    },
    bounce_2: {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'pink',
        margin: '10px',
        animation: 'bounce 1.5s infinite ease-in-out',
        animationDelay: '0.3s',

    },
    bounce_3: {
         width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'blue',
        margin: '10px',
        animation: 'bounce 1.5s infinite ease-in-out',
        animationDelay: '0.6s',

    },

}

const keyframes = `
    @keyframes bounce {
        0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = keyframes;
document.head.appendChild(styleSheet);


export default function Loading() {
const meta = useAppSelector(state=>state.meta)


  return (
    meta.loading &&
    <div className="w-full h-full" style={style.container}>
        <div  style={style.bounce_1}></div>
        <div  style={style.bounce_2}></div>
        <div  style={style.bounce_3}></div>
        <div  style={style.bounce_1}></div>
        <div  style={style.bounce_2}></div>
        <div  style={style.bounce_3}></div>
    </div>
  )
}
