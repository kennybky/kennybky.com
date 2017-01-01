using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Transoft.Startup))]
namespace Transoft
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
