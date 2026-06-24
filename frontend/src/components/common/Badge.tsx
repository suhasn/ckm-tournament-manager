import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    default: 'badge bg-slate-200 text-slate-800',
  }

  return (
    <span className={`${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
