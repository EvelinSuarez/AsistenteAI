import Swal from 'sweetalert2';

export const toast = (title: string, icon: 'success' | 'error' | 'warning') => {
  Swal.fire({
    title,
    icon,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#ffffff',
    color: '#0f172a',
    iconColor: icon === 'success' ? '#4f46e5' : '#f43f5e',
    customClass: {
      popup: 'rounded-2xl shadow-xl border border-slate-100'
    }
  });
};

export default toast;
