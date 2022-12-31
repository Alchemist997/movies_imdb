import React from 'react';

function SVG({ name }) {
    switch (name) {
        case 'loader_1':
            return (
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="200px"
                    height="200px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid">
                    <circle cx="80" cy="50" r="10" fill="#4ea7f9">
                        <animate attributeName="cx" values="80;50" keyTimes="0;1" dur="0.5s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="50;80" keyTimes="0;1" dur="0.5s" repeatCount="indefinite" />
                        <animate attributeName="fill" values="#4ea7f9;#ffffff" keyTimes="0;1" dur="0.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="50" cy="80" r="10" fill="#ffffff">
                        <animate attributeName="cx" values="50;20" keyTimes="0;1" dur="0.5s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="80;50" keyTimes="0;1" dur="0.5s" repeatCount="indefinite" />
                        <animate attributeName="fill" values="#ffffff;#4ea7f9" keyTimes="0;1" dur="0.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="20" cy="50" r="10" fill="#4ea7f9">
                        <animate attributeName="cx" values="20;50" keyTimes="0;1" dur="0.5s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="50;20" keyTimes="0;1" dur="0.5s" repeatCount="indefinite" />
                        <animate attributeName="fill" values="#4ea7f9;#ffffff" keyTimes="0;1" dur="0.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="50" cy="20" r="10" fill="#ffffff">
                        <animate attributeName="cx" values="50;80" keyTimes="0;1" dur="0.5s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="20;50" keyTimes="0;1" dur="0.5s" repeatCount="indefinite" />
                        <animate attributeName="fill" values="#ffffff;#4ea7f9" keyTimes="0;1" dur="0.5s" repeatCount="indefinite" />
                    </circle>
                </svg>
            );

        case 'loader_2':
            return (
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="200px"
                    height="200px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid">
                    <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#fff" stroke="none">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            dur="0.8s"
                            repeatCount="indefinite"
                            keyTimes="0;1"
                            values="0 50 51;360 50 51" />
                    </path>
                </svg>
            );

        default:
            console.error('Компонент "SVG" был вызван с некорректным аргументом');
            return 'Empty SVG';
    }
}

export default SVG;