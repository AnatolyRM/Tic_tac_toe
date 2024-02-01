export default function Square({value, handleClick}: {value: string | null, handleClick: ()=> void}) {
    return (
        <button
            className="square"
            onClick={handleClick}
        >{value}</button>
    );
}
