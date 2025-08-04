import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1.6rem;
    line-height: 1.6;
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.background};
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1.2rem 2.4rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.4rem;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    text-decoration: none;
  }

  .btn-primary {
    background: ${props => props.theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${props => props.theme.colors.primaryDark};
      transform: translateY(-2px);
    }
  }

  .btn-secondary {
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
    
    &:hover {
      background: ${props => props.theme.colors.primary};
      color: white;
    }
  }

  .btn-outline {
    background: transparent;
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.colors.border};
    
    &:hover {
      background: ${props => props.theme.colors.background};
      border-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.primary};
    }
  }

  .card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    padding: 2rem;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
  }

  .section {
    padding: 8rem 0;
  }

  .section-title {
    font-size: 3.2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1.6rem;
    color: ${props => props.theme.colors.text};
  }

  .section-subtitle {
    font-size: 1.8rem;
    color: ${props => props.theme.colors.textLight};
    text-align: center;
    margin-bottom: 4rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 1.5rem;
    }
    
    .section {
      padding: 6rem 0;
    }
    
    .section-title {
      font-size: 2.4rem;
    }
    
    .section-subtitle {
      font-size: 1.6rem;
    }
  }
`;

export default GlobalStyles;