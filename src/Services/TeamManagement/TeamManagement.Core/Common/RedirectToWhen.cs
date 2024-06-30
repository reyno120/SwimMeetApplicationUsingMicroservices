using System.Diagnostics;
using System.Reflection;

// Code taken from Gabriel Schenker
// https://lostechies.com/gabrielschenker/2015/06/06/event-sourcing-applied-the-aggregate/
// https://gist.github.com/gnschenker/c8e080608682986db7d1

namespace TeamManager.Core.Common
{
    public static class RedirectToWhen
    {
        static readonly MethodInfo InternalPreserveStackTraceMethod =
            typeof(Exception).GetMethod("InternalPreserveStackTrace", BindingFlags.Instance | BindingFlags.NonPublic);

        static class Cache<T>
        {
            // ReSharper disable StaticFieldInGenericType
            public static readonly IDictionary<Type, MethodInfo> Dict = typeof(T)
                .GetMethods(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance)
                .Where(m => m.Name == "When")
                .Where(m => m.GetParameters().Length == 1)
                .ToDictionary(m => m.GetParameters().First().ParameterType, m => m);
            // ReSharper restore StaticFieldInGenericType
        }

        [DebuggerNonUserCode]
        public static void InvokeEventOptional<T>(T instance, object @event)
        {
            MethodInfo info;
            var type = @event.GetType();
            if (!Cache<T>.Dict.TryGetValue(type, out info))
            {
                // we don't care if state does not consume events
                // they are persisted anyway
                return;
            }
            try
            {
                info.Invoke(instance, new[] { @event });
            }
            catch (TargetInvocationException ex)
            {
                if (null != InternalPreserveStackTraceMethod)
                    InternalPreserveStackTraceMethod.Invoke(ex.InnerException, new object[0]);
                throw ex.InnerException;
            }
        }
    }
}
