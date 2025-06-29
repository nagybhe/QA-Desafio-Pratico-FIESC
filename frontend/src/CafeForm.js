import React, { useState, useEffect } from 'react';

export default function CafeForm() {
    const [base, setBase] = useState([]);
    const [adicionais, setAdicionais] = useState([]);

    const [selecionadosBase, setSelecionadosBase] = useState([]);
    const [selecionadosAdicionais, setSelecionadosAdicionais] = useState([]);

    const [resultado, setResultado] = useState(null);
    const [erro, setErro] = useState(null);

    // Buscar ingredientes do backend
    useEffect(() => {
        fetch('http://localhost:3000/ingredientes/base')
            .then(res => res.json())
            .then(setBase)
            .catch(() => setErro('Erro ao buscar ingredientes base'));

        fetch('http://localhost:3000/ingredientes/adicionais')
            .then(res => res.json())
            .then(setAdicionais)
            .catch(() => setErro('Erro ao buscar ingredientes adicionais'));
    }, []);

    function toggleSelecionado(array, setArray, item) {
        if (array.includes(item)) {
            setArray(array.filter(i => i !== item));
        } else {
            setArray([...array, item]);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErro(null);
        setResultado(null);

        fetch('http://localhost:3000/cafes/identificar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredientes: selecionadosBase }),
        })
            .then(res => res.json())
            .then(data => setResultado(data))
            .catch(() => setErro('Erro ao identificar sabor'));
    }

    return (
        <div>
            <h2>Monte seu café</h2>

            <form onSubmit={handleSubmit}>
                <h3>Ingredientes Base</h3>
                {base.map(item => (
                    <label key={item}>
                        <input
                            type="checkbox"
                            checked={selecionadosBase.includes(item)}
                            onChange={() => toggleSelecionado(selecionadosBase, setSelecionadosBase, item)}
                        />
                        {item}
                    </label>
                ))}

                <h3>Ingredientes Adicionais (opcional)</h3>
                {adicionais.map(item => (
                    <label key={item}>
                        <input
                            type="checkbox"
                            checked={selecionadosAdicionais.includes(item)}
                            onChange={() => toggleSelecionado(selecionadosAdicionais, setSelecionadosAdicionais, item)}
                        />
                        {item}
                    </label>
                ))}

                <button type="submit">Identificar sabor</button>
            </form>

            {resultado && (
                <div>
                    <h3>Resultado:</h3>
                    {resultado.saborClassico
                        ? <p>Sabor clássico: {resultado.saborClassico}</p>
                        : <p>{resultado.mensagem}</p>}
                </div>
            )}

            {erro && <p style={{ color: 'red' }}>{erro}</p>}
        </div>
    );
}
