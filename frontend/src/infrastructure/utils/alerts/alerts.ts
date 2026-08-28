import Swal from 'sweetalert2'
import './alerts.css'

export function errorAlert(title: string, message: string) {
  Swal.fire({
    icon: 'error',             
    title,
    html: `<p>${message}</p>`,
    showConfirmButton: false,
    timer: 2000,              
    background: '#fff',
    width: '360px',
    padding: '1.5rem 2rem',
    customClass: {
      popup:         'custom-alert-popup',
      icon:          'custom-alert-icon',
      title:         'custom-alert-title',
      htmlContainer: 'custom-alert-message',
    }
  })
}


export function successAlert(title: string, message: string) {
  Swal.fire({
    icon: 'success',
    title,
    html: `<p>${message}</p>`,
    showConfirmButton: false,
    timer: 2000,
    background: '#fff',
    customClass: {
      popup:         'custom-alert-popup custom-success-popup',
      icon:          'custom-alert-icon',
      title:         'custom-alert-title',
      htmlContainer: 'custom-alert-message',
    }
  })
}

export function successAlertOk(title:string, message: string){
  Swal.fire({
    icon: "success",
    title: title,
    text: message,
    background: '#fff',
    customClass: {
      popup:         'swal-success-taller',
      icon:          'custom-alert-icon',
      title:         'custom-alert-title',
      htmlContainer: 'custom-alert-message',
    }
  });
}

export function errorAlertOk(title:string, message: string){
  Swal.fire({
    icon: "error",
    title: title,
    text: message,
    background: '#fff',
    customClass: {
      popup:         'swal-success-taller',
      icon:          'custom-alert-icon',
      title:         'custom-alert-title',
      htmlContainer: 'custom-alert-message',
    }
  });
}

export async function confirmationAlert(title: string, subtitle: string): Promise<boolean> {
  const result = await Swal.fire({
    title,
    text: subtitle,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  });
  return result.isConfirmed;
}

export function errorAlertWithRedirect(
  title: string | null,
  message: string,
  confirmText: string,
  redirectUrl: string,
) {
  return Swal.fire({
    title: title ?? undefined,
    html: `<p style="font-size:16px;">${message}</p>`,
    icon: "error",
    showConfirmButton: true,
    confirmButtonText: confirmText,
    showCancelButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: true,
    buttonsStyling: true,
  }).then(() => {
    window.location.href = redirectUrl;
  });
}