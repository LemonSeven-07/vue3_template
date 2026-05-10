import { defineConfig } from 'unocss';
import presetAttributify from '@unocss/preset-attributify';
import presetUno from '@unocss/preset-uno';
import transformDirective from '@unocss/transformer-directives';

export default defineConfig({
  presets: [presetAttributify(), presetUno()],
  transformers: [transformDirective()]
});
