export const Service = ({name, description, price})=>{ //PROPS -> parámetros que se envían al momento de llamar al componente (la función)
    return (
        <>
            <td>{name}</td>
            <td>{description}</td>
            <td>{price}</td>
        </>
    )
}