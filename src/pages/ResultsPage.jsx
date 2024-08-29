import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { useGame } from '../Context/GameContext';

const ResultsPage = () => {
    const [results, setResults] = useState(null);
    const navigate = useNavigate();
    const { score } = useGame();

    useEffect(() => {
        const gameSession = Cookies.get('gameSession');
        if (!gameSession) {
            navigate('/game');
            return;
        }

        const res = score(gameSession);
        setResults(res);
    }, [navigate]);

    if (!results) {
        return <div>Loading results...</div>;
    }


    return (
        <div className="min-h-screen bg-zinc-800 p-4 text-white flex flex-col items-center">
            <h1 className="text-3xl mb-4">Resultados del Juego</h1>
            <div className="w-full max-w-md">
                {results.scores.map(score => (
                    <div key={score.player._id} className="mb-4 p-2 bg-gray-700 rounded">
                        <h2 className="text-lg">
                            {score.player.username}: {score.score} puntos
                        </h2></div>
                ))}

                <h2 className="text-xl mt-6 mb-2">Respuestas por Categoría:</h2>

                {results.categories.map(category => (
                    <div key={category} className="mb-4">< h3 className="text-lg text-blue-400" > {category}</h3>
                        {results.responses.map(response => {
                            const answer = response.answers.find(ans => ans.category === category)?.answer || "N/A";
                            return (
                                <div key={response.player._id
                                } className="text-sm" >
                                    {response.player.username}: {answer}
                                </div>
                            );
                        })}
                    </div >
                ))}
            </div >
        </div >
    )
}

export default ResultsPage
