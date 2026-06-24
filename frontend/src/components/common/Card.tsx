import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  title?: string
  accent?: boolean
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, accent = false }) => {
  return (
    <div className={`${accent ? 'card-accent' : 'card'} p-6 ${className}`}>
      {title && (
        <>
          <h3 className="section-subtitle">{title}</h3>
          <div className="divider-orange h-0.5 mb-4"></div>
        </>
      )}
      {children}
    </div>
  )
}
