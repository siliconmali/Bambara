'use client'
import { ConfigProvider, theme as antdTheme } from 'antd';
import useCssVariable from '@/hooks/useCssVariable';

const ThemeProviderBody = (props: any) => {
  const colorPrimary = useCssVariable('--primary-default');
  const surfaceDefault = useCssVariable('--surface-default');
  const contentDefault = useCssVariable('--content-default');

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colorPrimary, // Use the computed value of --primary-default
          borderRadius: 4,
          fontSize: 14,
          colorBgBase: surfaceDefault, // Use the computed value of --surface-default
          colorTextBase: contentDefault, // Use the computed value of --content-default
        },
        algorithm: antdTheme.defaultAlgorithm,
      }}
    >
      {props.children}
    </ConfigProvider>
  );
};

export default ThemeProviderBody;

