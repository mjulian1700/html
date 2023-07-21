using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Demo_WebApp.API.DataModel;

namespace Demo_WebApp.API.Controllers
{
    public class FrutasController : Controller
    {
        private MercaditoEntities db = new MercaditoEntities();

        // GET: Frutas
        public ActionResult Index()
        {
            return View(db.Frutas.ToList());
        }

        // GET: Frutas/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Frutas frutas = db.Frutas.Find(id);
            if (frutas == null)
            {
                return HttpNotFound();
            }
            return View(frutas);
        }

        // GET: Frutas/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Frutas/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,nombre,descripcion,precioKg,imgUri,stockKg")] Frutas frutas)
        {
            if (ModelState.IsValid)
            {
                db.Frutas.Add(frutas);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(frutas);
        }

        // GET: Frutas/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Frutas frutas = db.Frutas.Find(id);
            if (frutas == null)
            {
                return HttpNotFound();
            }
            return View(frutas);
        }

        // POST: Frutas/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,nombre,descripcion,precioKg,imgUri,stockKg")] Frutas frutas)
        {
            if (ModelState.IsValid)
            {
                db.Entry(frutas).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(frutas);
        }

        // GET: Frutas/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Frutas frutas = db.Frutas.Find(id);
            if (frutas == null)
            {
                return HttpNotFound();
            }
            return View(frutas);
        }

        // POST: Frutas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Frutas frutas = db.Frutas.Find(id);
            db.Frutas.Remove(frutas);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
