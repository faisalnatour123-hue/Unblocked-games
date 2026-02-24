import React from 'react';

export const GameCard = ({ game, onClick }) => {
  return (
    <div 
      onClick={() => onClick(game)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 flex flex-col h-full"
    >
      <div className="h-40 w-full bg-gray-200 relative overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x400?text=${game.title}`;
          }}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{game.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{game.description}</p>
      </div>
    </div>
  );
}
