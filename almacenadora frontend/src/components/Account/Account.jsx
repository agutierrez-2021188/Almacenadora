export const Account = ({ dpi, name, surname, age, phone, email }) => {
    return (
        <>
            <td>{dpi}</td>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{age}</td>
            <td>{phone}</td>
            <td>{email}</td>
        </>
    )
}