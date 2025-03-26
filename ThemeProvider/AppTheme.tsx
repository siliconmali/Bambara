import { ThemeProvider } from './context';
import ThemeProviderBody from './ThemeProvider';


function AppThemeProvider(props: any) {
  return (
    <ThemeProvider>
      <ThemeProviderBody>{props.children}</ThemeProviderBody>
    </ThemeProvider>
  );
}

export default AppThemeProvider;