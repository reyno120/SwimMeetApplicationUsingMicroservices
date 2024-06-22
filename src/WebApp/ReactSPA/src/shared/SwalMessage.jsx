import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function SwalMessage(message, isError) {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
        title: isError ? <strong>Error!</strong> : <strong>Success!</strong>,
        html: <p>{message}</p>,
        confirmButtonColor: '#3B71CA',
        icon: isError ? 'error' : 'success'
    })
}