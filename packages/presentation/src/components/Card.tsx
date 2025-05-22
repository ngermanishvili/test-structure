import React from 'react';

type CardProps = {
    children: React.ReactNode;
    className?: string;
};

export default function Card({ children, className = '' }: CardProps) {
    return (
        <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
            {children}
        </div>
    );
}