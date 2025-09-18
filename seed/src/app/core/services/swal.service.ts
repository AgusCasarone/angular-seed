import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Swal, {
  SweetAlertIcon,
  SweetAlertOptions,
  SweetAlertResult
} from 'sweetalert2';

/**
 * SweetAlert2 wrapper:
 * - SSR-safe (no DOM calls on the server)
 * - Centralized defaults (Tailwind classes, behavior)
 * - Tiny helpers for common patterns (success/error/info/warn/confirm/toast)
 */
@Injectable({ providedIn: 'root' })
export class SwalService {
  private readonly platformId = inject(PLATFORM_ID);

  /** True only on the browser; Angular Universal will see false. */
  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * Project-wide default options.
   * - Uses your Tailwind components: .btn, .btn-primary, .btn-secondary, etc.
   * - heightAuto=false avoids layout jumps by not forcing html/body height
   * - buttonsStyling=false lets our Tailwind classes style the buttons
   */
  private base(opts?: SweetAlertOptions): SweetAlertOptions {
    return {
      heightAuto: false,
      returnFocus: true,
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-12 shadow-8px',
        title: 'text-lg font-semibold',
        htmlContainer: 'text-neutral-d-grey',
        actions: 'gap-3',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary',
        denyButton: 'btn btn-secondary'
      },
      ...opts
    };
  }

  /**
   * Core entry point.
   * Guards against SSR and applies defaults.
   */
  fire(opts: SweetAlertOptions): Promise<SweetAlertResult<any> | undefined> {
    if (!this.isBrowser) return Promise.resolve(undefined);
    return Swal.fire(this.base(opts));
  }

  // ---------- Convenience helpers ----------

  success(title: string, text?: string) {
    return this.fire({ icon: 'success', title, text });
  }

  error(title: string, text?: string) {
    return this.fire({ icon: 'error', title, text });
  }

  info(title: string, text?: string) {
    return this.fire({ icon: 'info', title, text });
  }

  warn(title: string, text?: string) {
    return this.fire({ icon: 'warning', title, text });
  }

  /**
   * Yes/No confirm dialog.
   * Usage:
   *   const res = await swal.confirm({ title: 'Delete?', text: 'Irreversible' });
   *   if (res?.isConfirmed) { ... }
   */
  confirm(opts: {
    title: string;
    text?: string;
    confirmText?: string;
    cancelText?: string;
    icon?: SweetAlertIcon;
  }) {
    const {
      title,
      text,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      icon = 'question'
    } = opts;

    return this.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      focusCancel: false,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText
    });
  }

  /**
   * Toasts (top-right, 3s). Example:
   *   const toast = swal.toast();
   *   toast.fire({ icon: 'success', title: 'Saved' });
   */
  toast() {
    return Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }
}
