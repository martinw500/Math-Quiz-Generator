import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MathContainer = styled.div`
  display: inline-block;
  font-size: 1.2em;
  margin: 0.2em;
  min-height: 1.5em;
  vertical-align: middle;
`;

const MathExpression = ({ expression, inline = true }) => {
  const mathRef = useRef();

  useEffect(() => {
    if (window.MathJax && mathRef.current) {
      // Clear the element first
      mathRef.current.innerHTML = '';
      
      // Determine if it's LaTeX or simple text
      const isLatex = expression.includes('\\') || expression.includes('^{') || expression.includes('_{');
      
      if (isLatex) {
        // Wrap in appropriate delimiters for MathJax
        const wrappedExpression = inline ? `$${expression}$` : `$$${expression}$$`;
        mathRef.current.innerHTML = wrappedExpression;
      } else {
        // For simple expressions, convert ^ to LaTeX superscript
        let processedExpression = expression.replace(/(\d+)\^(\d+)/g, '$1^{$2}');
        // Convert √ to LaTeX sqrt
        processedExpression = processedExpression.replace(/√(\d+)/g, '\\sqrt{$1}');
        
        const wrappedExpression = inline ? `$${processedExpression}$` : `$$${processedExpression}$$`;
        mathRef.current.innerHTML = wrappedExpression;
      }
      
      // Typeset the math
      window.MathJax.typesetPromise([mathRef.current]).catch((err) => {
        console.error('MathJax typeset error:', err);
      });
    }
  }, [expression, inline]);

  return <MathContainer ref={mathRef}></MathContainer>;
};

export default MathExpression;
