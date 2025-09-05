#include <napi.h>
using namespace Napi;

Value Hello(const CallbackInfo& info) {
    Env env = info.Env();
    return String::New(env, "Hello from C++ addon!");
}

Object Init(Env env, Object exports) {
    exports.Set("hello", Function::New(env, Hello));
    return exports;
}

NODE_API_MODULE(addon, Init)
