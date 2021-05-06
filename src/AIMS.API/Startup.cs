using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using AIMS.API.Domain.Repositories;
using AIMS.API.Domain.Services;
using AIMS.API.Persistence.Contexts;
using AIMS.API.Persistence.Repositories;
using AIMS.API.Services;
using Swashbuckle.AspNetCore.Swagger;

namespace AIMS.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddDbContext<AppDbContext>(options => {
                options.UseSqlServer(this.Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddScoped<IAssetRepository, AssetRepository>();
            services.AddScoped<IAuthorRepository, AuthorRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICirculationRepository, CirculationRepository>();
            services.AddScoped<IDashboardRepository, DashboardRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IAssetService, AssetService>();
            services.AddScoped<IAuthorService, AuthorService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ICirculationService, CirculationService>();
            services.AddScoped<IDashboardService, DashboardService>();
            services.AddScoped<IUserService, UserService>();

            #region Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(
                    // name: 攸關 SwaggerDocument 的 URL 位置。
                    name: "v1",
                    // info: 是用於 SwaggerDocument 版本資訊的顯示(內容非必填)。
                    info: new Info
                    {
                        Title = "RESTful API",
                        Version = "1.0.0",
                        Description = "This is ASP.NET Core RESTful API Sample.",
                    }
                );
            });
            #endregion

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            // else
            // {
            //     // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            //     app.UseHsts();
            // }
            app.UseStaticFiles();
            // app.UseHttpsRedirection();
            app.UseMvc();

            // Swagger
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint(
                    // url: 需配合 SwaggerDoc 的 name。 "/swagger/{SwaggerDoc name}/swagger.json"
                    url: "/swagger/v1/swagger.json",
                    // description: 用於 Swagger UI 右上角選擇不同版本的 SwaggerDocument 顯示名稱使用。
                    name: "RESTful API v1.0.0"
                );
            });
        }
    }
}
