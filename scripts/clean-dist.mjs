// 构建后清理：删除 dist/pages（Astro 页面编译中间产物，非静态页面，不应上线）
import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'dist', 'pages');

if (fs.existsSync(pagesDir)) {
  fs.rmSync(pagesDir, { recursive: true, force: true });
  console.log('✅ dist/pages 已清理（构建中间产物不随站点部署）');
} else {
  console.log('ℹ️ dist/pages 不存在，无需清理');
}
