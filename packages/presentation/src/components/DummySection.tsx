import React from 'react';
import Card from './Card';

type DummySectionProps = {
    className?: string;
};

export default function DummySection({ className = '' }: DummySectionProps) {
    return (
        <section className={`my-8 ${className}`}>
            <h2 className="text-2xl font-semibold mb-4">Dummy Section</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                    <Card key={item} className="overflow-hidden">
                        <div className="bg-gray-200 h-40 w-full">
                            {/* Dummy thumbnail */}
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                                <span className="text-2xl font-bold text-gray-500">Thumbnail {item}</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium text-lg mb-2">Dummy Title {item}</h3>
                            <p className="text-gray-600 text-sm">
                                This is a dummy description for item {item}. It doesn't do anything special yet.
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}