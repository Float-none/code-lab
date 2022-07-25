
// 当前目录svg下所有svg格式文件
const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
